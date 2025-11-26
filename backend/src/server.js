import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

// Import schema and resolvers
import { typeDefs } from './schema/schema.js';
import { resolvers } from './resolvers/employeeResolvers.js';

class EmployeeServer {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupDatabase();
    this.setupApolloServer();
  }

  setupMiddleware() {
    // Security headers
    this.app.use(helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: false
    }));

    // CORS configuration
    this.app.use(cors({
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
      credentials: true
    }));

    // Compression
    this.app.use(compression());

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  async setupDatabase() {
    try {
      const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/employee-management';
      
      // Updated connection options for Mongoose 7+
      await mongoose.connect(MONGODB_URI, {
        // Remove deprecated options
      });

      console.log('✅ Connected to MongoDB');
      
      // Optional: Create indexes for better performance
      try {
        await mongoose.connection.db.collection('employees').createIndex({ department: 1, position: 1 });
        await mongoose.connection.db.collection('employees').createIndex({ attendance: -1 });
        console.log('✅ Database indexes created');
      } catch (indexError) {
        console.log('ℹ️  Indexes may already exist');
      }

    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      
      // Don't exit if MongoDB is not available - use mock data
      console.log('🔄 Continuing with mock data...');
    }
  }

  async setupApolloServer() {
    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        // Simple auth context
        const token = req.headers.authorization?.replace('Bearer ', '');
        const user = token ? { id: '1', role: 'admin' } : null;
        return { user };
      },
      cache: 'bounded',
      plugins: [
        {
          requestDidStart() {
            return {
              didResolveOperation(requestContext) {
                console.log(`📊 GraphQL Operation: ${requestContext.request.operationName}`);
              }
            };
          }
        }
      ],
      formatError: (error) => {
        console.error('❌ GraphQL Error:', error);
        return {
          message: error.message,
          code: error.extensions?.code || 'INTERNAL_ERROR'
        };
      }
    });

    await this.server.start();
    this.server.applyMiddleware({ 
      app: this.app,
      cors: false
    });
  }

  start(port = 4000) {
    this.app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
      console.log(`🎯 GraphQL endpoint: http://localhost:${port}${this.server.graphqlPath}`);
      console.log(`📝 GraphQL Playground: http://localhost:${port}${this.server.graphqlPath}`);
    });
  }
}

process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await mongoose.connection.close();
  process.exit(0);
});

// Start server
const server = new EmployeeServer();
server.start();
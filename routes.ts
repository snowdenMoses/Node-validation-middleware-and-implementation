/* eslint-disable prettier/prettier */
import { Router } from 'express';
import validationMiddleware from './validationMiddleware';
import { CreateClientDto, UpdateClientDto } from './client.dto';
import ClientController from '@/controllers/project/client.controller';


interface Routes{
    path: string;
    router: Router
}

class ClientRoute implements Routes {
  public path = '/api/client';
  public router = Router();
  public client = new ClientController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.client.getClients);
    this.router.get(`${this.path}/:clientId`, this.client.getClient);
    this.router.post(`${this.path}`, validationMiddleware(CreateClientDto, 'body'), this.client.createClient);
    this.router.patch(`${this.path}/:clientId`, validationMiddleware(UpdateClientDto, 'body'), this.client.updateClient);
    this.router.delete(`${this.path}/:clientId`, this.client.deleteClient);
  }
}

export default ClientRoute;

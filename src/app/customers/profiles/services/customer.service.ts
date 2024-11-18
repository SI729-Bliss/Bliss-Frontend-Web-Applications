import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.entity';
import { Service } from '../model/service.entity';
import {BaseService} from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<Customer> {
  private apiUrl = 'https://my-json-server.typicode.com/Andorla0/dbjson';

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/customers';
  }
  // Obtener lista de clientes
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.basePath}${this.resourceEndpoint}`);
  }
  // Obtener lista de servicios
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.resourceEndpoint}/services`);
  }

  // Agregar un nuevo cliente
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.basePath}${this.resourceEndpoint}`, customer);
  }

  // Actualizar cliente existente
  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.basePath}${this.resourceEndpoint}/${customer.id}`, customer);
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.basePath}${this.resourceEndpoint}/${id}`);
  }

}

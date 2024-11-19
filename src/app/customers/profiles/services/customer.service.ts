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


  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/customers';
  }
  // Obtener lista de clientes
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.basePath}${this.resourceEndpoint}`);
  }
  // Obtener lista de servicios
  getServicesByCustomerId(customerId:number): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.basePath}/bookings/customer/${customerId}`);
  }

  // Agregar un nuevo cliente
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.basePath}${this.resourceEndpoint}`, customer);
  }

  // Actualizar cliente existente
  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.basePath}${this.resourceEndpoint}/${customer.id}`, customer);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.basePath}${this.resourceEndpoint}/${id}`);
  }

}

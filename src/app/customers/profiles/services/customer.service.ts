import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.entity';
import { Service } from '../model/service.entity';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'https://my-json-server.typicode.com/Andorla0/dbjson';

  constructor(private http: HttpClient) {}

  // Obtener lista de clientes
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/customers`);
  }

  // Obtener lista de servicios
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services`);
  }

  // Agregar un nuevo cliente
  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/customers`, customer);
  }

  // Actualizar cliente existente
  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/customers/${customer.id}`, customer);
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/customers/${id}`);
  }

}

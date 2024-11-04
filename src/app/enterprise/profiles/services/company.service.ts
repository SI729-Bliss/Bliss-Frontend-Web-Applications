import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../model/company.entity';
import { Stylist } from '../model/stylist.entity';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Obtener lista de clientes
  getCustomers(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.apiUrl}/companies`);
  }

  // Obtener lista de servicios
  getServices(): Observable<Stylist[]> {
    return this.http.get<Stylist[]>(`${this.apiUrl}/specialists`);
  }

  // Agregar un nuevo cliente
  addCustomer(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.apiUrl}/companies`, company);
  }

  // Actualizar cliente existente
  updateCustomer(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}/companies/${company.id}`, company);
  }

  getCustomerById(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/companies/${id}`);
  }

}

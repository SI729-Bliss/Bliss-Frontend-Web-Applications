import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../model/company.entity';
import { Stylist } from '../model/stylist.entity';
import {BaseService} from "../../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService<Company> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/companies';
  }

  // Obtener lista de clientes
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${this.basePath}${this.resourceEndpoint}`);
  }

  // Obtener lista de servicios
  getSpecialists(): Observable<Stylist[]> {
    return this.http.get<Stylist[]>(`${this.basePath}/specialists`);
  }

  // Agregar un nuevo cliente
  addCustomer(company: Company): Observable<Company> {
    return this.http.post<Company>(`${this.basePath}${this.resourceEndpoint}`, company);
  }

  // Actualizar cliente existente
  updateCustomer(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.basePath}${this.resourceEndpoint}/${company.id}`, company);
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.basePath}${this.resourceEndpoint}/${id}`);
  }

}

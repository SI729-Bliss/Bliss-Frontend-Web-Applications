import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

import { FeedbackService } from "../../services/feedback.service";
import { Feedback } from "../../model/feedback.entity";
import { ReviewCreateComponent } from "../../components/review-create/review-create.component";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-review-management',
  standalone: true,
  imports: [
    MatCard,
    MatIcon,
    NgClass,
    MatInput,
    MatButton,
    ReviewCreateComponent,
    MatPaginator, MatSort, MatIconModule,
    MatTableModule, TranslateModule
  ],
  templateUrl: './review-management.component.html',
  styleUrl: './review-management.component.css'
})
export class ReviewManagementComponent implements OnInit, AfterViewInit  {
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

}

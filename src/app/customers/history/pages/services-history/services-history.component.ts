import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../../review/services/review.services';
import { Review } from '../../../review/model/review.entity';
import { MatTableModule } from '@angular/material/table';
import { DatePipe, NgForOf } from '@angular/common';
import { ServicesGridComponent } from '../../components/services-grid/services-grid.component';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-services-history',
  standalone: true,
  imports: [
    MatTableModule,
    NgForOf,
    ServicesGridComponent,
    DatePipe,
    TranslateModule
  ],
  templateUrl: './services-history.component.html',
  styleUrls: ['./services-history.component.css']
})
export class ServicesHistoryComponent implements OnInit {
  reviews: Review[] = [];
  displayedColumns: string[] = ['bookingId', 'punctuation', 'comment', 'createdDate'];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.getAll().subscribe(reviews => {
      this.reviews = reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });
  }
}

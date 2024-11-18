// review-card.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../model/review.entity';
import { Service } from '../../../history/model/service.entity';
import { Booking } from '../../../history/model/booking.entity';
import { ReviewService } from '../../services/review.services';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import axios from 'axios';
import { Cloudinary } from 'cloudinary-core';
import { TranslateModule } from "@ngx-translate/core";

const cloudinaryInstance = new Cloudinary({
  cloud_name: 'dmeftoblw',
  secure: true
});

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [
    MatIcon,
    MatFormField,
    MatInput,
    MatCardFooter,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCard,
    MatCardHeader,
    DatePipe,
    FormsModule,
    MatCardActions,
    MatButton,
    NgForOf,
    NgIf,
    TranslateModule
  ],
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit {
  @Input() review: Review = new Review();
  @Input() reservation: Booking = new Booking();
  @Input() service: Service = new Service();
  @Input() userName: string = '';
  todayDate: Date = new Date();
  stars: boolean[] = [false, false, false, false, false];
  rating: number = 0;
  images: string[] = ['', '', ''];

  constructor(private reviewService: ReviewService, private router: Router) {}

  ngOnInit(): void {
    if (this.review) {
      this.rating = this.review.punctuation;
      this.stars = Array(5).fill(false).map((_, i) => i < this.rating);
    }
  }

  get comment(): string {
    return this.review ? this.review.comment : '';
  }

  set comment(value: string) {
    if (this.review) {
      this.review.comment = value;
    }
  }

  selectStar(index: number): void {
    this.rating = index + 1;
    this.stars = Array(5).fill(false).map((_, i) => i < this.rating);
  }

  async uploadImage(event: any, index: number): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Bliss-review');

      try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/dmeftoblw/image/upload`, formData);
        if (response.data && response.data.secure_url) {
          this.images[index] = response.data.secure_url;
          this.review.imageUrls[index] = response.data.secure_url;
        } else {
          console.error('Invalid response from Cloudinary', response);
        }
      } catch (error) {
        console.error('Upload failed', error);
      }
    }
  }

  saveReview(): void {
    this.review.punctuation = this.rating;
    this.review.reservationId = this.reservation.id;
    this.review.createdAt = new Date().toISOString();
    this.review.updatedAt = new Date().toISOString();
    this.review.imageUrls = this.images;

    if (this.review.id) {
      this.reviewService.updateReview(this.review.id, this.review).subscribe(() => {
        this.router.navigate(['/my-services']);
      });
    } else {
      this.reviewService.createReview(this.review).subscribe(() => {
        this.router.navigate(['/my-services']);
      });
    }
  }

  cleanInputs(): void {
    this.review.comment = '';
    this.rating = 0;
    this.stars = Array(5).fill(false);
    this.images = ['', '', ''];
  }
}


import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { NgForm } from '@angular/forms';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { Review } from "../../../../../../Bliss-Frontend-Web-Applications/src/app/review/model/review.entity"
import { ReviewService } from "../../../../../../Bliss-Frontend-Web-Applications/src/app/review/model/review.service";
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
const INITIAL_IMAGES: (string | null)[] = [null, null, null];
@Component({
  selector: 'app-review-create-and-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatCardActions,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatCard,
    BrowserModule,
    MdCardModule
  ],
  templateUrl: './review-create-and-edit.component.html',
  styleUrl: './review-create-and-edit.component.css'
})
export class ReviewCreateAndEditComponent {
  review: Review = new Review(0, 0, '', '', 0, '', 0, []);
  userName: string = "John Doe";
  userImage: string = "https://via.placeholder.com/50"; // Placeholder for user image
  todayDate: Date = new Date();
  rating: number = 0; // Initialize rating
  imagePreviews: (string | null)[] = [...INITIAL_IMAGES]; // To hold image previews // To hold image previews
  stars: number[] = Array(5).fill(0); // Create an array for 5 stars

  constructor(private reviewService: ReviewService) {}

  selectStar(index: number) {
    this.rating = index + 1; // Set the rating based on star clicked
  }

  uploadImage(index: number) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images[index] = e.target.result as string; // Set the image preview
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  saveReview() {
    this.review.punctuation = this.rating;
    this.review.created_date = this.todayDate.toISOString().split('T')[0]; // Format date
    this.review.images = this.images.filter(img => img); // Only include non-null images
    this.reviewService.addReview(this.review); // Add the review to the service
    alert("Review saved successfully!");
    this.cleanInputs(); // Clear inputs after saving
  }

  cleanInputs() {
    this.review = new Review(0, 0, '', '', 0, '', 0, []);
    this.images = [null, null, null]; // Reset images
    this.rating = 0; // Reset rating
  }
}



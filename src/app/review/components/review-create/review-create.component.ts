import {Component, NgIterable} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Feedback} from "../../model/feedback.entity";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle, MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatInput} from "@angular/material/input";
import {DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-review-create',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatIcon,
    MatInput,
    NgIf,
    NgOptimizedImage,
    NgForOf,
    NgClass,
    MatCardHeader,
    MatCardFooter,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    MatFormField,
    DatePipe,
    FormsModule
  ],
  templateUrl: './review-create.component.html',
  styleUrl: './review-create.component.css'
})
export class ReviewCreateComponent {
  userName: string = 'John Doe';
  userImage: string = 'https://via.placeholder.com/50';
  todayDate: Date = new Date();
  review: { description: string } = { description: '' };
  images: string[] = ['', '', '']; // Image placeholders
  rating: number = 0; // Initial rating
  stars: number[] = new Array(5); // Array for 5 stars
  constructor(private http: HttpClient) {}
  selectStar(index: number) {
    this.rating = index + 1; // Set rating based on star clicked
  }
  uploadImage(index: number) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images[index] = e.target.result; // Set image preview
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  saveReview() {
    // Crear la estructura de feedback usando la entidad Feedback
    const newFeedback: Feedback = {
      id: 0, // json-server gestionará el id automáticamente
      punctuation: this.rating,
      comment: this.review.description,
      created_date: new Date().toISOString().split('T')[0], // Fecha de hoy
      reservation_id: 1, // Deberías asignar el valor correcto para reservation_id
      reservation_day: new Date().toISOString().split('T')[0], // Día de la reserva
      beauty_salon_id: 1, // Deberías asignar el valor correcto para beauty_salon_id
      images: this.images.filter(img => img !== '') // Filtrar las imágenes vacías
    };

    // Hacer una solicitud POST al servidor json-server
    this.http.post('http://localhost:3000/feedback', newFeedback)
      .subscribe(
        response => {
          console.log('Review saved successfully!', response);
          alert('¡Reseña guardada exitosamente!');
          this.cleanInputs(); // Limpiar los campos después de guardar
        },
        error => {
          console.error('Error saving review:', error);
          alert('Error al guardar la reseña.');
        }
      );
  }

  cleanInputs() {
    this.review.description = '';
    this.images = ['', '', '']; // Reset images
    this.rating = 0; // Reset rating
  }
}

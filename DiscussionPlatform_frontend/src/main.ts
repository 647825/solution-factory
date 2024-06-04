import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Gebruik provideHttpClient
import { importProvidersFrom } from '@angular/core'; // Voeg deze import toe
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { FormsModule } from '@angular/forms'; // Voeg FormsModule toe

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(FormsModule), // Voeg FormsModule toe als provider
    // Voeg eventuele andere providers toe die je nodig hebt
  ]
})
  .catch(err => console.error(err));

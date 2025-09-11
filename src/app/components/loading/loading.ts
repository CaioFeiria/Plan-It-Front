import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading';

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  templateUrl: './loading.html',
  styleUrl: './loading.css'
})
export class LoadingComponent implements OnInit, OnDestroy {
  isLoading = false;
  private subscription?: Subscription;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.subscription = this.loadingService.loading$.subscribe(
      loading => this.isLoading = loading
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
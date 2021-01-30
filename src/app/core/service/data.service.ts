import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { IProject } from '../models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public isSearchQuery: Subject<string> = new Subject();
  public isToggle: Subject<boolean> = new Subject();
  public isSort: Subject<Sort> = new Subject();
  public isSomeWord: Subject<string> = new Subject();
  public isCardItem: Subject<IProject> = new Subject();

  public setSearchQuery(query: string): void {
    this.isSearchQuery.next(query);
  }

  public setToggleOutput(toggle: boolean): void {
    this.isToggle.next(toggle);
  }

  public setSortOptions(sort: Sort): void {
    this.isSort.next(sort);
  }

  public setFilterKeyWord(query: string): void {
    this.isSomeWord.next(query);
  }

  public setCardById(item: IProject): void {
    this.isCardItem.next(item);
  }

  // public getCardById(): Observable<CardItem> {
  //   return this.isCardItem.asObservable();
  // }
}

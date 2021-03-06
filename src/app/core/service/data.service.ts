import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { IProject } from '../models/projects.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public isSearchQuery: Subject<string> = new Subject();

  public isSort: Subject<Sort> = new Subject();

  public isSomeWord: Subject<string> = new Subject();

  public isCardItem: Subject<IProject> = new Subject();

  public setSearchQuery(query: string): void {
    this.isSearchQuery.next(query);
  }

  public setSortOptions(sort: Sort): void {
    this.isSort.next(sort);
  }

  public setFilterKeyWord(query: string): void {
    this.isSomeWord.next(query);
  }

  public setProjectById(item: IProject): void {
    this.isCardItem.next(item);
  }

  public getProjectById(): Observable<IProject> {
    return this.isCardItem.asObservable();
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { IProjectWithFavourite } from '../../core/models/projects.model';

function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Pipe({
  name: 'sortProjects'
})
export class SortProjectsPipe implements PipeTransform {
  public transform(allProjects: IProjectWithFavourite[], sort: Sort): IProjectWithFavourite[] {
    if (!allProjects) { return []; }
    const data: IProjectWithFavourite[] = allProjects.slice();
    if (!sort.active || sort.direction === '') {
      return allProjects;
  }
    // eslint-disable-next-line no-param-reassign
    allProjects = data.sort((a: IProjectWithFavourite, b: IProjectWithFavourite) => {
    const isAsc: boolean = sort.direction === 'asc';
    switch (sort.active) {
      case 'count': {
        const countA = Number(a.numberOfDonations);
        const countB = Number(b.numberOfDonations);
        return compare(countA, countB, isAsc);
      }
      case 'goal': {
        const goalA = Number(a.goal);
        const goalB = Number(b.goal);
        return compare(goalA, goalB, isAsc);
      }
      case 'date': {
        const dateA = Number(new Date(a.dateOfMostRecentReport));
        const dateB = Number(new Date(b.dateOfMostRecentReport));
        return compare(dateA, dateB, isAsc);
      }
      default: {
        return 0;
      }
    } });
    return allProjects;
  }
}

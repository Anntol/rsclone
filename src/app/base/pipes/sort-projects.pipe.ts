import { Pipe, PipeTransform } from '@angular/core';
import { Sort } from '@angular/material/sort';

import { IProject } from '../../core/models/projects.model';

function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Pipe({
  name: 'sortProjects'
})
export class SortProjectsPipe implements PipeTransform {
  public transform(allProjects: IProject[], sort: Sort): IProject[] {
    const data: IProject[] = allProjects.slice();
    if (!sort.active || sort.direction === '') {
      return allProjects;
  }
    // eslint-disable-next-line no-param-reassign
    allProjects = data.sort((a: IProject, b: IProject) => {
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
        const dateA = Number(new Date(a.approvedDate));
        const dateB = Number(new Date(b.approvedDate));
        return compare(dateA, dateB, isAsc);
      }
      default: {
        return 0;
      }
    } });
    return allProjects;
  }
}

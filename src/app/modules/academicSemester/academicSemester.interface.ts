export type IMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcademicSemesterName = 'Autumn' | 'Summer' | 'Fall'
export type IAcademicSemesterCode = '01' | '02' | '03'

// main
export type IAcademicSemester = {
  name: IAcademicSemesterName
  code: IAcademicSemesterCode
  year: string
  startMonth: IMonths
  endMonth: IMonths
}

//For Validation

export type TAcademicSemesterNameCodeMapper = {
  Autumn: string
  Summer: string
  Fall: string
}
export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}

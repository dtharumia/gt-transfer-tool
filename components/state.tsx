import { entity } from 'simpler-state'
import { CourseStorage } from './types'

export const savedCourses = entity([] as CourseStorage[]);

export const setSavedCourses = (courses: CourseStorage[]) => {
    savedCourses.set(courses)
}

export const addSavedCourse = (course) => {
    savedCourses.set(savedCourses.get().concat(course))
    localStorage.setItem('savedCourses', JSON.stringify(savedCourses.get()))
}

export const removeSavedCourse = (course) => {
    savedCourses.set(savedCourses.get().filter((c) => c.id !== course.id))
    localStorage.setItem('savedCourses', JSON.stringify(savedCourses.get()))
}

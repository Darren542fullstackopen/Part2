import Header from './Header';
import React from 'react'
import Content from './Content';
import Total from './Total';


const Course = ( { courses } ) => {
  return (
    <>
      {courses.map(course => 
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total sum={course.parts.map(part => part.exercises).reduce( (acc, exercises) => acc + exercises)} />
        </div>
    )}
    </>
)
}

export default Course;
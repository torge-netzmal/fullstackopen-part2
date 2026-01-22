const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>);
}

const Content = ({parts}) => {
    console.log("Content", parts);
    return (
        <div>
            {parts.map((part) =>
                <Part key={"part"+part.id} part = {part}/>
            )}
        </div>

    );
}

const Total = (props) => {
    const total = props.parts.reduce((t, p) => t + p.exercises, 0);

    return (
        <>
            <p><b>total of exercises {total}</b></p>
        </>
    );
}

const Part = (props) => {
    console.log("Part", props);
    return (
        <>
            <p>
                {props.part.name} {props.part.exercises}
            </p>
        </>
    )
}

const Course = ({course}) => {
    return (
        <div id={"course"+course.id}>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    );
}

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            }
        ]
    }

    return <Course course={course} />
}

export default App
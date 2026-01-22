import App from "../App.jsx";

const Header = (props) => {
    return (
        <>
            <h2>{props.course}</h2>
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

export default Course
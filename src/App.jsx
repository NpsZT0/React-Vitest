import Counter from "./components/Counter";
import RegisterForm from "./components/Register";
import UserList from "./components/UserList";

function App() {
  return (
    <>
      <div className="max-w-xl mx-auto">
        <h1 className="underline text-4xl font-bold mb-2">Counter component</h1>
        <Counter />
        <h1 className="underline text-4xl font-bold mt-8">UserList component</h1>
        <UserList />{" "}
        <h1 className="underline text-4xl font-bold mt-8">Register component</h1>
        <RegisterForm />
      </div>
    </>
  );
}

export default App;

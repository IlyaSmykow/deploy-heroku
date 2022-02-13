import "./App.scss";
import { useEffect } from "react";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { ModalWindow } from "./components/ModalWindow/ModalWindow";
import { AppRouter } from "./components/AppRouter/AppRouter";
import { Alert } from "./components/Alert/Alert";
import { useSelector } from "react-redux";
import { getAuth } from "./redux/selectors/authSelectors";
import { getMessage } from "./redux/selectors/authSelectors";
import { PostsBlock } from "./components/PostsBlock/PostsBlock";
import { useDispatch } from "react-redux";
import { getAllPosts } from "./redux/reducers/posts_reducer";
import { checkUserAuth } from "./redux/reducers/auth_reducer";

function App() {
  const dispatch = useDispatch();
  const message = useSelector(getMessage);
  const isAuth = useSelector(getAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(checkUserAuth());
    }
    dispatch(checkUserAuth());
  }, [dispatch, isAuth]);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="App">
      <PostsBlock />
      <Sidebar />
      <ModalWindow />
      <AppRouter />
      {message && <Alert>{message}</Alert>}
    </div>
  );
}

export default App;

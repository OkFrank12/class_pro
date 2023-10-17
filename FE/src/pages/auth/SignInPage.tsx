import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInAPI, verifiedAPI } from "../../api/authAPI";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { user } from "../../global/recoil";
import jwtDecode from "jwt-decode";

const SignInPage = () => {
  const { token } = useParams();
  const [state, setState] = useState<boolean>(false);
  const [myState, setMyState] = useRecoilState(user);
  const onChangeState = () => {
    setState(!state);
  };

  //   console.log("myState from signin: ", myState);
  const navigate = useNavigate();

  const model = yup.object({
    email: yup.string().email().trim().lowercase().required(),
    password: yup.string().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(model),
  });

  const onHandleSubmit = handleSubmit(async (data: any) => {
    signInAPI(data).then((res) => {
      if (res) {
        Swal.fire({
          icon: "success",
          text: "Login User",
          timer: 3000,
          timerProgressBar: true,
          showCancelButton: false,
        }).then(() => {
          setMyState(res);
          console.log(jwtDecode(res));
          //   navigate(`/`);
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Check credentials",
          timer: 3000,
          timerProgressBar: true,
          showCancelButton: false,
        });
      }
    });
  });

  useEffect(() => {
    if (token) {
      console.log(jwtDecode(token));
      const data: any = jwtDecode(token);
      verifiedAPI(data.id);
    }
  }, []);
  return (
    <>
      <div className="w-full h-[100vh] flex bg-slate-400 justify-center items-center">
        <form
          onSubmit={onHandleSubmit}
          className="w-[350px] py-5 px-3 h-[350px] rounded-md bg-white shadow-md flex flex-col items-center"
        >
          <p className="font-bold">Sign In</p>
          <button className="px-10 py-2 rounded-md capitalize hover:bg-slate-100 text-slate-500 border my-3">
            google
          </button>
          <hr className="w-full mb-3" />
          <input
            type="email"
            className="w-full mb-3 h-[50px] pl-2 outline-slate-400 border"
            placeholder="franklin@gmail.com"
            {...register("email")}
          />
          <div className="w-full relative h-[50px]">
            {!state ? (
              <input
                type="text"
                className="w-full h-[100%] pl-2 outline-slate-400 border"
                placeholder="*******"
                {...register("password")}
              />
            ) : (
              <input
                type="password"
                className="w-full h-[100%] pl-2 outline-slate-400 border"
                placeholder="*******"
                {...register("password")}
              />
            )}
            {state ? (
              <AiOutlineEye
                onClick={onChangeState}
                className="absolute right-2 cursor-pointer top-4"
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={onChangeState}
                className="absolute right-2 cursor-pointer top-4"
              />
            )}
          </div>

          <button
            type="submit"
            className="px-10 py-2 rounded-md capitalize hover:bg-slate-100 text-slate-500 border my-3"
          >
            sign in
          </button>
          <span className="text-center text-[12px] text-slate-500">
            Don't have an account?
            <Link to={`/register`}>
              <span className="font-bold capitalize cursor-pointer">
                sign up
              </span>
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default SignInPage;

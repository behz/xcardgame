// import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";

import { cookies } from "next/headers";
import Game from '../components/Game';
import { UserProvider } from '../contexts/userContext';


const index: React.FC = () => {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center ">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          {/* <DeployButton /> */}
          <div>X Card Game</div>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-20 px-3 w-full items-center ">
        <main className="flex-1 flex flex-col gap-6 w-full items-center">
          <UserProvider>
            <Game/>
          </UserProvider>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a><span> - </span>  
          <a
            href="https://nextjs.org/"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Next.js
          </a>
        </p>
      </footer>
    </div>
  );
}

export default index;
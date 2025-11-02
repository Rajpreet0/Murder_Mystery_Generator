//import Header from "@/components/Header";

interface Props {
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {
    return(
        <div className="min-h-screen">
            {/*<Header/>*/}
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout
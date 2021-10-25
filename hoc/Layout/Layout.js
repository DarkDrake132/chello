import Header from '../../component/Header/Header';

function Layout({ children }) {
    return (
        <div className="">
            <Header />
            {children}
            {/* Footer */}
        </div>
    )
}

export default Layout;
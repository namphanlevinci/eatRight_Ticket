import SearchIcon from 'assets/icons/search';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name?: string;
}

const SearchInput = (props: IProps) => {
    return (
        <div className="search">
            <input className="search-input" {...props} />
            <SearchIcon />
        </div>
    );
};

export default SearchInput;

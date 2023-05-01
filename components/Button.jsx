import { BsMoon } from 'react-icons/bs';
import { useTheme } from 'next-themes';

const Button = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    return (
        <button
            onClick={() =>
                theme == 'dark' ? setTheme('light') : setTheme('dark')
            }
            className="flex gap-4 items-center cursor-pointer"
        >
            <BsMoon />
            <p className=" font-semibold">Dark Mode</p>
        </button>
    );
};

export default Button;

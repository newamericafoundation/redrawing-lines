type Props = {
    color: string;
};

const Bar: React.FC<Props> = (props) => {
    const { color = '#000' } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill={color}
        >
            <path d="M640-160v-280h160v280H640Zm-240 0v-640h160v640H400Zm-240 0v-440h160v440H160Z" />
        </svg>
    );
};

export default Bar;

import { Typography } from 'src/components/Typography';

export const NoDataPopup: React.FC = () => {
    return (
        <div>
            <Typography variant="body-large">
                Area excluded due to missing property assessment data.
            </Typography>
        </div>
    );
};

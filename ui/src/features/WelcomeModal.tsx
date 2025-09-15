import { useEffect, useState } from 'react';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';
import { Typography } from 'src/components/Typography';

export const WelcomeModal: React.FC = () => {
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const inReport = queryParams.get('inReport');

        if (inReport === null) {
            setShowWelcome(true);
        }
    }, []);

    const handleClose = () => {
        setShowWelcome(false);
    };

    return (
        <Modal
            title="Redrawing the Lines"
            open={showWelcome}
            handleClose={handleClose}
            action={
                <Button title="Continue to application" onClick={handleClose}>
                    <Typography variant="body">Continue</Typography>
                </Button>
            }
        >
            <section>
                <Typography variant="h3" as="h2">
                    Welcome
                </Typography>
                <Typography variant="body-large">
                    This interactive map compares current school district
                    boundaries with new lines from the proposed redistricting
                    model. Explore the data to see how redrawing school district
                    boundaries could provide more diverse student populations
                    with fairer access to local school funding in every state.
                </Typography>
                <br />
                <Typography variant="body-large">
                    Note: New districts were not simulated for Alaska, Kansas,
                    Kentucky, Maine, Minnesota, New Mexico, or South Carolina,
                    due to limitations in available property valuation data.
                    Hawaii and the District of Columbia were excluded from this
                    analysis, as each has only one school district.
                </Typography>
            </section>
        </Modal>
    );
};

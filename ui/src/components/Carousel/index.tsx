import React, { ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useDotButton } from 'src/components/Carousel/Buttons/useDotButton';
import { usePrevNextButtons } from 'src/components/Carousel/Buttons/usePrevNextButtons';
import { PrevButton } from 'src/components/Carousel/Buttons/PreviousButton';
import { NextButton } from 'src/components/Carousel/Buttons/NextButton';
import { DotButton } from 'src/components/Carousel/Buttons/DotButton';

type Props = {
    id: string;
    slides: ReactNode[];
};

const Carousel: React.FC<Props> = (props) => {
    const { id, slides } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((slide, index) => (
                        <div
                            key={`carousel-slide-${id}-${index}`}
                            className="embla__slide"
                        >
                            {slide}
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__controls">
                <div className="embla__buttons">
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>

                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex
                                    ? ' embla__dot--selected'
                                    : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Carousel;

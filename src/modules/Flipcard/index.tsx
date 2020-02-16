import React, { ReactElement } from "react";
import styles from "./styles.module.scss";

interface FlipcardProps {
    imageStyles: string;
    imageSrc: string;
    imageAlt: string;
    theme: string;
    selected: boolean;
    onClick: Function;
    children?: Array<ReactElement> | ReactElement;
}

const Flipcard = (props: FlipcardProps): JSX.Element => {
    const {
        imageStyles,
        imageSrc,
        imageAlt,
        theme,
        selected,
        onClick,
        children
    } = props;

    function enableGroup(): void {
        return !selected && onClick();
    }

    return (
        <div className={ `${ styles.flipCard } ${ selected ? styles.enabled : styles.disabled }` } onClick={ enableGroup }>
            <div className={ styles.flipCardInner }>
                <div className={ styles.flipCardFront }>
                    <div className={ `${ styles.earmark } ${ theme }` }></div>
                    <img className={ `${ styles.logo } ${ imageStyles }` } src={ imageSrc } alt={ imageAlt } />
                </div>
                <div className={ `${ styles.flipCardBack } ${ theme }` }>
                    { children }
                </div>
            </div>
        </div>
    );
};

export default Flipcard;
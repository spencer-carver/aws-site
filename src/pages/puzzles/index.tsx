import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../../modules/Navigation";
import puzzles, { Puzzle } from "../puzzle/puzzles";
import styles from "../puzzle/styles.module.scss";

const Puzzles = (): JSX.Element => {
    return (
        <Navigation isHomepage={ false }>
            <div className={ styles.puzzle }>
                <div className={ styles.title }>Puzzles</div>
                <div className={ styles.description }>
                    I&apos;m trying to make puzzles! Here&apos;s all my attempts in order of creation. This page is not a puzzle.
                </div>
                <ul className={ styles.list }>
                    { Object.keys(puzzles).map((puzzleId: string, index: number) => {
                        const puzzle = (puzzles as { [key: string]: Puzzle })[puzzleId];

                        return <li key={ index }><Link to={ `/puzzle/${ puzzleId }` }>{ puzzle.title }</Link></li>;
                    }) }
                </ul>
            </div>
        </Navigation>
    );
};

export default Puzzles;

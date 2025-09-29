import {FC, useState} from 'react';
import {
    Button,
    Image,
    Badge,
} from 'react-bootstrap';

import checkCircleSvg from '__images/check-circle.svg';
import logo from '__images/logo.png';

import style from './style.module.scss';

const App: FC = () => {
    const [counter, setCounter] = useState(0);

    const onMinusClick = () => setCounter(counter - 1);

    const onPlusClick = () => setCounter(counter + 1);

    return (
        <div className={style.app}>
            <Image
                src={logo}
                alt="logo"
            />

            <Image
                src={checkCircleSvg}
                alt="svg"
            />

            <Badge>
                sdfsdfsdfsdf
            </Badge>

            <h1>
                React-Bootstrap Boilerplate
            </h1>

            <div className={style.counterContainer}>
                <Button onClick={onMinusClick}>
                    -
                </Button>

                <strong>{counter}</strong>

                <Button onClick={onPlusClick}>
                    +
                </Button>
            </div>
        </div>
    );
};

export default App;

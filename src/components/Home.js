import Banner from './Banner';
import DailyPick from './DailyPick';
import Review from './Review';
import Promotion from './Promotion';

const Home = () => {
    return (
        <div>
            <Banner/>
            <DailyPick/>
            <Promotion/>
            <Review/>
        </div>
    );
};

export default Home;
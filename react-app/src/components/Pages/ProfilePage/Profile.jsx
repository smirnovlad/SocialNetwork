import classes from "./Profile.module.css"
import LeftColumn from "./LeftColumn/LeftColumn"
import RightColumn from "./RightColumn/RightColumn"
import {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import {useParams, useNavigate} from "react-router-dom"
import {fetchUserInfo} from "../../../api/userInfo"
import store from '../../../store/store'

const Profile = (userId) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState()

    useEffect(() => {
        const userId = params.userid
        dispatch(fetchUserInfo(userId)).unwrap()
            .then((originalPromiseResult) => {
                setData(store.getState().currentProfileData)
            })
            .catch((rejectedValueOrSerializedError) => {
                navigate("/login")
                console.log(rejectedValueOrSerializedError)
            }).finally(() => {
                setLoading(false)
            })
    }, [dispatch, params.userid]);

    // TODO: handle case if userId is not exist
    if (loading) return (
        <span>Data is loading</span>
    );

    return (
        <div className={classes.Profile}>
            <LeftColumn/>
            <RightColumn data={data}/>
        </div>
    )
}

export default Profile
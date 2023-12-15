import classes from "./Profile.module.css"
import LeftColumn from "./LeftColumn/LeftColumn"
import RightColumn from "./RightColumn/RightColumn"
import {useState, useEffect} from "react"
import {useDispatch} from "react-redux"
import {useParams, useNavigate} from "react-router-dom"
import {fetchUserInfo} from "../../../api/userInfo"

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const params = useParams();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userId = params.userid
        console.log(userId)
        dispatch(fetchUserInfo(userId)).unwrap()
            .then((originalPromiseResult) => {
            })
            .catch((rejectedValueOrSerializedError) => {
                navigate("/login")
                console.log(rejectedValueOrSerializedError)
            }).finally(() => {
                setLoading(false)
            })
    }, [dispatch]);

    // TODO: handle case if userId is not exist
    if (loading) return (
        <span>Data is loading</span>
    );

    return (
        <div className={classes.Profile}>
            <LeftColumn/>
            <RightColumn/>
        </div>
    )
}

export default Profile
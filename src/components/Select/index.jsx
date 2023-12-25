import React, {useEffect} from 'react';
import {Form, FormGroup, Input} from "reactstrap";
import * as PropTypes from "prop-types";
import {user_info} from "../../utils/mock/user";
import {axiosService} from "../../services/axiosServices";
import {geoJson} from "../../utils/mock/geoJson";

function Select({setOptionsId}) {
    const [listOptions, setListOptions] = React.useState([]);

    const handleLoadSpaceByOptions = async (optionsId) => {
        setOptionsId(optionsId);

    }

    const handleFetchListOptions = async () => {
        if(user_info.role === 'DISTRICT_MANAGER'){
            const {data} = await axiosService.get(`/wards/district/${user_info.district.id}`);
            return data;
        }else if (user_info.role === 'WARD_MANAGER') {
            const {data} =  await axiosService.get('/');
            return (data);
        }
        else {
                const {data} =  await axiosService.get('/');
                return (data);
            }
        }
    useEffect(() => {
       handleFetchListOptions().then((data) => {
           setListOptions(data);
       });
    }, []);

    const renderOptions = () => {
        return (
            listOptions.map((item) => {
                return (
                    <option key={item.id} value={item.id}>{item.name}</option>
                )
            })
        )
    }

    return (
        <>
            <Form>
                <FormGroup>
                    <Input
                        id="exampleSelect"
                        name="select"
                        type="select"
                        onChange={ (e) => setOptionsId(e.target.value)}
                    >
                        <option>Tất cả</option>
                        { listOptions && renderOptions()}
                    </Input>
                </FormGroup>
            </Form>
        </>
    )
}
export default Select;
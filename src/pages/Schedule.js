import React from 'react';

import { IMAGES } from "../constants/theme";
import PageTitle from '../elements/PageTitle';
import ScheduleTable from '../elements/ScheduleTable';
import { ScheduleEvents } from './Schedules/Components';

const Schedule = () => {
 
    return (
        <>
            <div className="page-content bg-white">
                <PageTitle activePage="Eventos" parentTitle="Calendario" />    
              
                    <div className="animate__animated animate__fadeInRightBig"
                    style={{ backgroundImage: "url(" + IMAGES.BgImage1 + ")",marginTop:'40px', marginLeft:'50px' ,marginBottom:'20px', marginRight:'50px' }}
                    >
                        <b1>Schedule Original</b1>
                        <div className="schedule-table table-responsive">
                            <ScheduleTable />
                        </div>
                        <b1>Schedule Demo</b1>
                        <div className="schedule-table table-responsive">
                        <ScheduleEvents/>
                        </div> 
                    </div>
                
            </div>   
        </>
    );
};

export default Schedule;
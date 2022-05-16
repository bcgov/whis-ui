import React from 'react';
import '../../styles/dashboard.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FlagIcon from '@mui/icons-material/Flag';


const Dashboard: React.FC = () => {
	return (
		<>
			<div className='cards_container'>
				<div className='dash_profile'>
					<div className='dash_title'>
						<SettingsIcon className='card_icon' color="disabled" />
						<p className='card_title'>Profile</p>
					</div>
					<div className='card_user_icon'>
						<AccountCircleIcon className='userIcon' style={{ fill: 'rgb(26, 90, 150)' }} />
					</div>
					<div className='dash_title'>
						<PersonIcon style={{ fill: 'rgb(26, 90, 150)' }} />
						<p className='card_title'>Jane Doe</p>
						<span>Wildlife Health Biologist</span>
						<svg height="30" width="300">
							<path stroke="#ADB5BD" stroke-width="1" d="M5 30 l239 0" />
						</svg>
					</div>
					<div className="align_info">
						<div className='dash_title'>
							<LocalPhoneIcon className='card_icon' style={{ fill: 'rgb(26, 90, 150)' }} />
							<p className='card_contact'>250 751-3219</p>
						</div>
						<div className='dash_title'>
							<EmailIcon className='card_icon' style={{ fill: 'rgb(26, 90, 150)' }} />
							<p className='card_contact'>jane.doe@gov.bc.ca</p>
						</div>
						<div className='dash_title'>
							<BusinessIcon className='card_icon' style={{ fill: 'rgb(26, 90, 150)' }} />
							<p className='card_contact'>FLNR</p>
						</div>
					</div>
					<div className="quick_access">
						<svg height="30" width="300">
							<path stroke="#ADB5BD" stroke-width="1" d="M5 30 l239 0" />
						</svg>
						<p className='access_title'>Quick Access</p>
						<div className="acc_icons">
							<AddCircleOutlineIcon style={{ fill: 'rgb(26, 90, 150)' }} />
							<ManageSearchIcon style={{ fill: 'rgb(26, 90, 150)' }} />
							<NotificationsNoneIcon style={{ fill: 'rgb(26, 90, 150)' }} />
						</div>
					</div>
				</div>
				<div className="widget_align">
					<div className='dash_welcome'>
						<div className='widget_title'>
							<p className='greeting'>Welcome, Jane Doe!</p>
							<p className='rm_margin'>There are a few actions that you can take listed in the following</p>
						</div>
						<div className="align_btns">
							<button className='btn_actions'>Generate Wildlife Health ID</button>
							<button className='btn_actions'>View WLH ID Inventory</button>
							<button className='btn_actions'>Future Function</button>
						</div>
					</div>
					<div className='dash_actions'>
						<div className='widget_title'>
							<div className='inner_content'>
								<NotificationsIcon className='widget_icon' style={{ fill: 'rgb(26, 90, 150)' }} />
								<p className='inner_title'>Actions</p>
							</div>
							<div className="action_detail">
								<p className='content_padding'>10 recently generated IDs do not have details info</p>
								<a>View details</a>
							</div>
							<div className="action_detail">
								<p className='content_padding'>ID generation request from the NLS organization</p>
								<a>View details</a>
							</div>
							<div className="action_detail">
								<p className='content_padding'>10 recently generated IDs do not have details info</p>
								<a>View details</a>
							</div>
							<div className="action_detail">
								<p className='content_padding'>10 recently generated IDs do not have details info</p>
								<a>View details</a>
							</div>
							<div className="action_detail">
								<p className='content_padding'>10 recently generated IDs do not have details info</p>
								<a>View details</a>
							</div>
							<div className="action_detail">
								<p className='content_padding'>10 recently generated IDs do not have details info</p>
								<a>View details</a>
							</div>
						</div>
					</div>
					<div className='dash_reports'>
						<div className='widget_title'>
							<div className='inner_content'>
								<FlagIcon className='widget_icon' style={{ fill: 'rgb(26, 90, 150)' }} />
								<p className='inner_title'>Reports</p>
							</div>
							<div className="report_detail">
								<span className='count_num'>1,859</span>
								<span>IDs Generated</span>
								<span className='id_requests'>From last 7 days</span>
							</div>
							<div className="report_detail">
								<span className='count_num'>45</span>
								<span>IDs Requests</span>
								<span className='id_requests'>From 12 organizations</span>
							</div>
							<div>
								<svg height="30" width="370">
									<path stroke="#ADB5BD" stroke-width="1" d="M5 30 l345 0" />
								</svg>
							</div>
						</div>
					</div>
				</div>

			</div>
		</>
	);
};

export default Dashboard;

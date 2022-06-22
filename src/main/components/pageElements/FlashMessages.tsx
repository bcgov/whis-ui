import React, {useEffect, useState} from 'react';
import '../../styles/alert.scss';

import {useSelector} from '../../../state/utilities/use_selector';
import {selectFlashMessages} from "../../../state/reducers/flash_messages";
import {Close} from "@mui/icons-material";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {FLASH_MESSAGE_DISMISS} from "../../../state/actions";

const FlashMessages: React.FC = () => {
	const {messages} = useSelector(selectFlashMessages);
	const dispatch = useDispatch();

	return (
		<div className={'alertContainer'}>
			<div className={'alertList'}>
				{messages.map((m) => (
					<div className={`alertMessage ${m.type}`}>
						<Button onClick={() => {
							dispatch({type: FLASH_MESSAGE_DISMISS, payload: {id: m.id}})
						}} className={'dismiss'}><Close/></Button>
						<span className={'title'}>{m.title}</span>
						<span className={'body'}>{m.body}</span>
					</div>
				))}
			</div>
		</div>
	)
};

export default FlashMessages;

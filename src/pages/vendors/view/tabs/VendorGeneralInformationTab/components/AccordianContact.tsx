import React from 'react'
import ATMTextField from 'src/components/UI/atoms/formFields/ATMTextField/ATMTextField'

const AccordianContact = (data: any) => {
    const contactInfoLength = data?.data?.contactInformation?.length
    return (
        <div>
            {data?.data?.contactInformation?.map(
                (contact: any, contactIndex: number) => (
                    <div
                        key={contactIndex}
                        className={`${
                            contactIndex !== contactInfoLength - 1 &&
                            'border-b pb-4'
                        } ${
                            contactIndex === 0 ? 'pb-4' : 'pt-4'
                        }  border-slate-300 `}
                    >
                        <div className="text-primary-main text-lg pb-2 font-medium">
                            Contact Information #{contactIndex + 1}
                        </div>
                        <div className="grid grid-cols-3 gap-4 gap-y-5">
                            <ATMTextField
                                name=""
                                value={contact?.name}
                                onChange={(e) => {}}
                                label={'name'}
                                placeholder={'name'}
                                className="shadow bg-white rounded"
                                disabled={true}
                            />

                            <ATMTextField
                                name=""
                                value={contact?.department}
                                onChange={(e) => {}}
                                label={'department'}
                                placeholder={'department'}
                                className="shadow bg-white rounded"
                                disabled={true}
                            />

                            <ATMTextField
                                name=""
                                value={contact?.designation}
                                onChange={(e) => {}}
                                label={'designation'}
                                placeholder={'designation'}
                                className="shadow bg-white rounded"
                                disabled={true}
                            />

                            <ATMTextField
                                name=""
                                value={contact?.email}
                                onChange={(e) => {}}
                                label={'email'}
                                placeholder={'email'}
                                className="shadow bg-white rounded"
                                disabled={true}
                            />
                            <ATMTextField
                                name=""
                                value={contact?.mobileNumber}
                                onChange={(e) => {}}
                                label={'Mobile Number'}
                                placeholder={'Mobile Number'}
                                className="shadow bg-white rounded"
                                disabled={true}
                            />

                            <ATMTextField
                                name=""
                                value={contact?.landLine}
                                onChange={(e) => {}}
                                label={'landLine'}
                                placeholder={'landLine'}
                                className="shadow bg-white rounded"
                                disabled={true}
                            />
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default AccordianContact

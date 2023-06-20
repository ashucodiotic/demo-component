import React, { useRef } from 'react'
import { getInputHeight, Size } from 'src/utils/formUtils/getInputHeight'

type Props = {
    size?: Size
    label?: string
    required?: boolean
    placeholder?: string
    onSelect: (file: File) => void
    selectedFile: any
    accept: string
    disabled?: boolean
    isSubmitting?: boolean
    isVideo?: boolean
}
const ATMFileUploader = ({
    size = 'small',
    label = '',
    required = false,
    placeholder = 'Select Image',
    onSelect,
    selectedFile,
    accept,
    disabled = false,
    isSubmitting = true,
    isVideo = false,
}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <div>
            {label && (
                <label className="text-slate-700 font-medium">
                    {label}{' '}
                    {required && <span className="text-red-500"> * </span>}
                </label>
            )}
            <button
                type="button"
                onClick={() => {
                    inputRef?.current?.click()
                }}
                className={`flex items-center px-2 w-full border-[2.5px] border-slate-400 border-dashed rounded bg-white ${getInputHeight(
                    size
                )} ${label} text-slate-400`}
            >
                {selectedFile ? (
                    <div className="overflow-x-auto py-2 text-slate-900 font-medium ">
                        {selectedFile.name || 'Uploaded file'}
                    </div>
                ) : (
                    placeholder
                )}
            </button>

            {selectedFile && isSubmitting && (
                <div className="w-full h-[150px] mt-1 border rounded shadow">
                    {isVideo ? (
                        <video
                            src={
                                typeof selectedFile === 'string'
                                    ? selectedFile
                                    : URL.createObjectURL(selectedFile)
                            }
                            className="w-full h-full rounded"
                            controls
                        />
                    ) : (
                        <img
                            src={
                                typeof selectedFile === 'string'
                                    ? selectedFile
                                    : URL.createObjectURL(selectedFile)
                            }
                            alt=""
                            className="w-full h-full rounded"
                        />
                    )}
                </div>
            )}

            {/* Input Type File - Hidden */}
            <input
                type="file"
                ref={inputRef}
                onChange={(e: any) => onSelect(e.target.files[0])}
                className="hidden"
                accept={accept}
                disabled={disabled}
            />
        </div>
    )
}

export default ATMFileUploader

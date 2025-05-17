import { useUpdatePassword } from "@/api/auth/useAuth"
import { useForm } from "react-hook-form"

const SecurityTab = () => {
  const { mutate: updatePassword } = useUpdatePassword()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: any) => {
    console.log("Sending to API...", data)
    // TODO: Replace with actual API call
    // await axios.post('/api/update-password', data);
    updatePassword(data)
  }

  const Button = ({
    children,
    className = "",
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }

  const newPassword = watch("newPassword")

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-[#1A1A1D] rounded-lg p-6 space-y-6'
    >
      <h2 className='text-xl font-semibold mb-4'>Security</h2>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm text-gray-400 block'>
            Current Password
          </label>
          <input
            type='password'
            {...register("currentPassword", {
              required: "Current password is required",
            })}
            placeholder='Enter your current password'
            className='w-full h-10 px-3 py-2 bg-[#212121] border border-[#3c3c3c] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors'
          />
          {errors.currentPassword && (
            <p className='text-red-500 text-sm'>
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label className='text-sm text-gray-400 block'>New Password</label>
            <input
              type='password'
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters required",
                },
              })}
              placeholder='Enter your new password'
              className='w-full h-10 px-3 py-2 bg-[#212121] border border-[#3c3c3c] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors'
            />
            {errors.newPassword && (
              <p className='text-red-500 text-sm'>
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <label className='text-sm text-gray-400 block'>
              Confirm Password
            </label>
            <input
              type='password'
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              placeholder='Confirm your new password'
              className='w-full h-10 px-3 py-2 bg-[#212121] border border-[#3c3c3c] rounded-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors'
            />
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        type='submit'
        className='bg-[#7367f0] hover:bg-purple-700 w-24 h-9 text-white'
        disabled={!isDirty}
      >
        Update
      </Button>
    </form>
  )
}

export default SecurityTab

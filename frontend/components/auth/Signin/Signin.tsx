import Image from "next/image";

export const SignIn = () => {
    return (
        <div>
            <div className="lg:hidden py-5 flex items-center justify-center">
                <Image src="/logo.png" width={172} height={70} alt="Logo" />
            </div>
            <div className="px-12">
                <h1 className="font-bold text-[34px]">Sign In</h1>
                <form className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none block w-full px-3 py-2 border-none rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

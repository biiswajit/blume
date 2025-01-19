import React from "react";
import { ArrowRight, MessageCircle, Upload, Users, Layout } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Manage Your Classroom</span>
              <span className="block text-gray-400">With Ease</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Create virtual classrooms, manage assignments, and foster
              real-time discussions - all in one place.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <Link
                href={"/register"}
                className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 md:py-4 md:text-lg md:px-10"
              >
                Start Teaching
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Everything you need to manage your classroom
            </h2>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="pt-6">
                <div className="flow-root bg-zinc-900 rounded-lg px-6 pb-8 border border-zinc-800">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-white rounded-md shadow-lg">
                      <MessageCircle className="h-6 w-6 text-black" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-white tracking-tight">
                      Real-time Discussions
                    </h3>
                    <p className="mt-5 text-base text-gray-400">
                      Engage your students with live discussions and instant
                      feedback in a collaborative environment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="pt-6">
                <div className="flow-root bg-zinc-900 rounded-lg px-6 pb-8 border border-zinc-800">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-white rounded-md shadow-lg">
                      <Upload className="h-6 w-6 text-black" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-white tracking-tight">
                      Assignment Management
                    </h3>
                    <p className="mt-5 text-base text-gray-400">
                      Easily create, distribute, and grade assignments. Students
                      can submit their work seamlessly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="pt-6">
                <div className="flow-root bg-zinc-900 rounded-lg px-6 pb-8 border border-zinc-800">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-white rounded-md shadow-lg">
                      <Users className="h-6 w-6 text-black" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-white tracking-tight">
                      Multiple Classrooms
                    </h3>
                    <p className="mt-5 text-base text-gray-400">
                      Create and manage multiple classrooms with different sets
                      of students and assignments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-gray-400">
              Create your first classroom today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href={"/register"}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

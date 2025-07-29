"use client";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

const Agents = () => {
  const { getAgents, agents } = useAuthStore();

  useEffect(() => {
    getAgents();
  }, [getAgents]);

  return (
    <div>
      <h1 className="text-4xl mb-4">Agents</h1>
      {agents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        agents.map((agent) => (
          <div
            key={agent._id}
            className="border p-4 rounded-md mb-4 shadow-sm flex gap-4 items-center"
          >
            <img
              src={agent.image}
              alt="agent profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{agent.user?.name}</p>
              <p>{agent.user?.email}</p>
              <p className="text-sm text-gray-500">{agent.user?.role}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Agents;

"use client"
import { useAuthStore } from "@/stores/authStore";
import { usePropertiesStore } from "@/stores/propertiesStore";
import { useEffect } from "react";

const Agents = () => {
    const { getAgents ,agents } = useAuthStore()

    useEffect(() => {
        getAgents()
    },[getAgents])
    return(
        <div>
            <h1 className="text-4xl">Agents</h1>
           {agents.map((agent) => (
            <div>
                <div></div>
                <div>
                    <p>{agent.name}</p>
                    <p>{agent.email}</p>
                    <p>{agent.role}</p>
                </div>
            </div>
           ))}
        </div>
    )
}

export default Agents;
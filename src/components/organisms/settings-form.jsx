"use client";
import { useState } from "react";
import { toast } from "sonner";
import { CURRENT_USER, CURRENT_STUDIO } from "@/lib/constants";
import { getTeamMembers, getStudioSettingsSnapshot, updateStudioSettings } from "@/lib/store/team-store";
import { PageHeader } from "@/components/templates/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
export function SettingsForm() {
    const initial = getStudioSettingsSnapshot();
    const [studioName, setStudioName] = useState(initial.studioName);
    const [email, setEmail] = useState(initial.email);
    const [phone, setPhone] = useState(initial.phone);
    const team = getTeamMembers();
    const handleSave = () => {
        updateStudioSettings({ studioName, email, phone });
        toast.success("Settings saved");
    };
    return (<div className="space-y-8 animate-in fade-in duration-500 max-w-3xl">
      <PageHeader title="Settings" description="Manage your studio profile and preferences"/>

      <Card>
        <CardHeader><CardTitle>Your Profile</CardTitle></CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={CURRENT_USER.avatar} alt={CURRENT_USER.name}/>
            <AvatarFallback>{getInitials(CURRENT_USER.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{CURRENT_USER.name}</p>
            <p className="text-sm text-muted-foreground">{CURRENT_USER.role}</p>
            <p className="text-sm text-muted-foreground">{CURRENT_STUDIO}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Studio Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Studio Name</Label>
            <Input value={studioName} onChange={(e) => setStudioName(e.target.value)} className="rounded-xl"/>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl"/>
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-xl"/>
          </div>
          <Button className="rounded-xl" onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Team Members</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {team.map((member) => (<div key={member.id} className="flex items-center gap-3 p-3 rounded-xl border">
              <Avatar>
                {member.avatar ? <AvatarImage src={member.avatar} alt={member.name}/> : null}
                <AvatarFallback className="bg-primary text-white text-sm">{getInitials(member.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>))}
          <Button variant="outline" className="rounded-xl w-full" onClick={() => toast.info("Invite link copied to clipboard")}>
            Invite Team Member
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Integrations</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl border">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-success"/>
              <div>
                <p className="font-medium text-sm">WhatsApp Business</p>
                <p className="text-xs text-muted-foreground">Sync client messages</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => toast.info("WhatsApp integration setup started")}>Connect</Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl border">
            <div>
              <p className="font-medium text-sm">Tally ERP</p>
              <p className="text-xs text-muted-foreground">Accounting sync</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => toast.info("Tally connection wizard opened")}>Connect</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardHeader><CardTitle>Billing Plan</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Professional Plan</p>
              <p className="text-sm text-muted-foreground">₹4,999/month · Up to 15 projects</p>
            </div>
            <Badge>Active</Badge>
          </div>
          <Button variant="outline" className="rounded-xl mt-4" onClick={() => toast.info("Subscription portal opened")}>Manage Subscription</Button>
        </CardContent>
      </Card>
    </div>);
}
